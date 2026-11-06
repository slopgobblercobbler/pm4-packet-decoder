#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetContextRegPairsDef {
    static constexpr std::uint8_t opcode = 0xb8;
    static constexpr std::string_view name = "IT_SET_CONTEXT_REG_PAIRS";
    static constexpr std::string_view desc = "Bulk load offset-value pairs into context state registers";
};
}
