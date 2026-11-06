#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetUconfigRegPairsDef {
    static constexpr std::uint8_t opcode = 0xbb;
    static constexpr std::string_view name = "IT_SET_UCONFIG_REG_PAIRS";
    static constexpr std::string_view desc = "Bulk load offset-value pairs into user configuration registers";
};
}
