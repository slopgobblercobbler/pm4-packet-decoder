#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItFlushAndInvDbDataDef {
    static constexpr std::uint8_t opcode = 0x48;
    static constexpr std::string_view name = "IT_FLUSH_AND_INV_DB_DATA";
    static constexpr std::string_view desc = "Flush and invalidate depth/stencil hardware cache blocks";
};
}
