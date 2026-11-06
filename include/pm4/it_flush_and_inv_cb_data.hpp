#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItFlushAndInvCbDataDef {
    static constexpr std::uint8_t opcode = 0x46;
    static constexpr std::string_view name = "IT_FLUSH_AND_INV_CB_DATA";
    static constexpr std::string_view desc = "Flush and invalidate color buffer hardware cache blocks";
};
}
